#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import simpleGit from "simple-git";
import { execSync } from "child_process";
import axios from "axios";

const program = new Command();
const AUTH_FILE = path.join(process.cwd(), ".monogear_auth.json");

function saveAuth(username, password) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ username, password }, null, 2));
}

function loadAuth() {
  if (!fs.existsSync(AUTH_FILE)) return null;
  return JSON.parse(fs.readFileSync(AUTH_FILE, "utf-8"));
}

program
  .name("monogear")
  .description("MonoGear CLI - The official CLI for the MonoGear monorepo platform")
  .version("0.1.0");

program
  .command("docker-setup")
  .description("Install and setup Docker CLI, then guide user to run python3 dockerdaemon.py")
  .action(async () => {
    try {
      execSync("docker --version", { stdio: "ignore" });
      console.log(chalk.green("Docker is already installed!"));
    } catch {
      console.log(chalk.yellow("Docker is not installed. Please install Docker from https://www.docker.com/products/docker-desktop and ensure it is in your PATH."));
      return;
    }
    console.log(chalk.cyan("To start the Docker server, run: python3 server/dockerdaemon.py"));
  });

program
  .command("authenticate")
  .description("Authenticate user (store username and password in local JSON)")
  .action(async () => {
    const answers = await inquirer.prompt([
      { type: "input", name: "username", message: "Enter your username:" },
      { type: "password", name: "password", message: "Enter your password:", mask: "*" }
    ]);
    saveAuth(answers.username, answers.password);
    console.log(chalk.green("Authentication details saved."));
  });

const sync = program.command("sync").description("Sync operations (local/remote)");

sync
  .command("local")
  .description("Clone a repository using the configured user and password")
  .action(async () => {
    let auth = loadAuth();
    if (!auth) {
      console.log(chalk.red("No authentication found. Please run 'monogear authenticate' first."));
      return;
    }
    const { repo } = await inquirer.prompt([
      { type: "input", name: "repo", message: "Enter repository HTTPS URL to clone:" }
    ]);
    const repoUrl = new URL(repo);
    repoUrl.username = encodeURIComponent(auth.username);
    repoUrl.password = encodeURIComponent(auth.password);
    const folder = path.basename(repoUrl.pathname, ".git");
    try {
      await simpleGit().clone(repoUrl.toString(), folder);
      console.log(chalk.green(`Repository cloned to ./${folder}`));
    } catch (err) {
      console.log(chalk.red("Failed to clone repository:"), err.message);
    }
  });

sync
  .command("remote")
  .description("Push local changes to remote using the configured user and password")
  .option("--branch <branch>", "Branch to push to")
  .action(async (opts) => {
    let auth = loadAuth();
    if (!auth) {
      console.log(chalk.red("No authentication found. Please run 'monogear authenticate' first."));
      return;
    }
    const { repo } = await inquirer.prompt([
      { type: "input", name: "repo", message: "Enter repository HTTPS URL to push to:" }
    ]);
    const { message } = await inquirer.prompt([
      { type: "input", name: "message", message: "Enter commit message:", default: "monogear sync remote" }
    ]);
    const repoUrl = new URL(repo);
    repoUrl.username = encodeURIComponent(auth.username);
    repoUrl.password = encodeURIComponent(auth.password);
    try {
      const git = simpleGit();
      await git.add(".");
      await git.commit(message);
      if (opts.branch) {
        await git.push([repoUrl.toString(), `HEAD:${opts.branch}`]);
      } else {
        await git.push([repoUrl.toString()]);
      }
      console.log(chalk.green("Changes pushed to remote repository."));
    } catch (err) {
      console.log(chalk.red("Failed to push to remote repository:"), err.message);
    }
  });

program
  .command("make-repo")
  .description("Create a new repository via the backend API")
  .action(async () => {
    const auth = loadAuth();
    if (!auth) {
      console.log(chalk.red("No authentication found. Please run 'monogear authenticate' first."));
      return;
    }
    const { name, description } = await inquirer.prompt([
      { type: "input", name: "name", message: "Repository name:" },
      { type: "input", name: "description", message: "Repository description:" }
    ]);
    try {
      const response = await axios.post("http://localhost:8000/api/repos", {
        name,
        description,
        username: auth.username,
        password: auth.password
      });
      if (response.data && response.data.success) {
        console.log(chalk.green(`Repository '${name}' created successfully!`));
      } else {
        console.log(chalk.red("Failed to create repository."));
      }
    } catch (err) {
      console.log(chalk.red("Error creating repository:"), err.message);
    }
  });

program
  .command("history")
  .description("View commit history of the current repository")
  .action(async () => {
    try {
      const git = simpleGit();
      const log = await git.log();
      log.all.forEach(commit => {
        console.log(`${chalk.cyan(commit.hash.slice(0,7))} ${chalk.yellow(commit.date)} ${chalk.green(commit.author_name)}: ${commit.message}`);
      });
    } catch (err) {
      console.log(chalk.red("Failed to get commit history:"), err.message);
    }
  });

program
  .command("checkout-prev")
  .description("Checkout a previous commit interactively")
  .action(async () => {
    try {
      const git = simpleGit();
      const log = await git.log();
      const { commit } = await inquirer.prompt([
        {
          type: "list",
          name: "commit",
          message: "Select a commit to checkout:",
          choices: log.all.map(c => ({ name: `${c.hash.slice(0,7)} - ${c.message}`, value: c.hash }))
        }
      ]);
      await git.checkout(commit);
      console.log(chalk.green(`Checked out commit ${commit}`));
    } catch (err) {
      console.log(chalk.red("Failed to checkout commit:"), err.message);
    }
  });

// Suggested command stubs
program
  .command("status")
  .description("Show git status in a pretty format")
  .action(async () => {
    try {
      const git = simpleGit();
      const status = await git.status();
      console.log(status);
    } catch (err) {
      console.log(chalk.red("Failed to get status:"), err.message);
    }
  });

program
  .command("diff")
  .description("Show a colored diff of unstaged changes")
  .action(async () => {
    try {
      const git = simpleGit();
      const diff = await git.diff();
      if (diff) {
        console.log(chalk.blue(diff));
      } else {
        console.log(chalk.green("No unstaged changes."));
      }
    } catch (err) {
      console.log(chalk.red("Failed to show diff:"), err.message);
    }
  });

program
  .command("stash")
  .description("Stash current changes and list stashes interactively")
  .action(async () => {
    try {
      const git = simpleGit();
      const { action } = await inquirer.prompt([
        { type: "list", name: "action", message: "Stash or view stashes?", choices: ["Create stash", "List stashes", "Apply stash"] }
      ]);
      if (action === "Create stash") {
        await git.stash();
        console.log(chalk.green("Changes stashed."));
      } else if (action === "List stashes") {
        const stashes = await git.stashList();
        stashes.all.forEach((s, i) => console.log(`${i}: ${s.message}`));
      } else if (action === "Apply stash") {
        const stashes = await git.stashList();
        if (stashes.total === 0) {
          console.log(chalk.yellow("No stashes to apply."));
          return;
        }
        const { idx } = await inquirer.prompt([
          { type: "list", name: "idx", message: "Select a stash to apply:", choices: stashes.all.map((s, i) => ({ name: `${i}: ${s.message}`, value: i })) }
        ]);
        await git.stash(["apply", `stash@{${idx}}`]);
        console.log(chalk.green(`Applied stash ${idx}.`));
      }
    } catch (err) {
      console.log(chalk.red("Failed with stash operation:"), err.message);
    }
  });

program
  .command("branch list")
  .description("List all branches")
  .action(async () => {
    try {
      const git = simpleGit();
      const branches = await git.branchLocal();
      branches.all.forEach(b => console.log(b));
    } catch (err) {
      console.log(chalk.red("Failed to list branches:"), err.message);
    }
  });

program
  .command("branch create <name>")
  .description("Create a new branch")
  .action(async (name) => {
    try {
      const git = simpleGit();
      await git.checkoutLocalBranch(name);
      console.log(chalk.green(`Created and switched to branch ${name}`));
    } catch (err) {
      console.log(chalk.red("Failed to create branch:"), err.message);
    }
  });

program
  .command("branch delete <name>")
  .description("Delete a branch")
  .action(async (name) => {
    try {
      const git = simpleGit();
      await git.deleteLocalBranch(name);
      console.log(chalk.green(`Deleted branch ${name}`));
    } catch (err) {
      console.log(chalk.red("Failed to delete branch:"), err.message);
    }
  });

program
  .command("repo list")
  .description("List all accessible repositories (stub)")
  .action(() => {
    console.log(chalk.yellow("Not implemented yet."));
  });

program
  .command("whoami")
  .description("Show the currently authenticated user")
  .action(() => {
    const auth = loadAuth();
    if (auth) {
      console.log(chalk.green(`Authenticated as ${auth.username}`));
    } else {
      console.log(chalk.yellow("Not authenticated."));
    }
  });

program
  .command("init")
  .description("Initialize a new repo locally with monogear defaults (stub)")
  .action(() => {
    console.log(chalk.yellow("Not implemented yet."));
  });

program
  .command("hello")
  .description("Prints a welcome message")
  .action(() => {
    console.log(chalk.green("👋 Welcome to MonoGear CLI!"));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
