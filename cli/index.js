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
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ username: username, password: password }));
}

function loadAuth() {
  if (!fs.existsSync(AUTH_FILE)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(AUTH_FILE).toString());
}

program
  .name("monogear")
  .description("MonoGear CLI - The official CLI for the MonoGear monorepo platform")
  .version("0.1.0");

program
  .command("setup")
  .description("Set up MonoGear: Docker, clone repo, and prepare server.")
  .action(async () => {
    let installed = false;
    try {
      execSync("docker --version", { stdio: "ignore" });
      installed = true;
    } catch (e) {}
    if (installed) {
      console.log(chalk.bgGreen.black('Docker is installed and available.'))
    } else {
      console.log(chalk.bgRed.white('Docker is not installed.'))
      console.log(chalk.bgYellow.black('Download from: ') + chalk.underline.white('https://www.docker.com/products/docker-desktop'))
      return
    }
    var repoUrl = "http://github.com/monogear-org/mono"
    var repoDir = "mono"
    if (!fs.existsSync(repoDir)) {
      try {
        console.log(chalk.bgBlue.white('Cloning repository:') + " " + chalk.white(repoUrl))
        await simpleGit().clone(repoUrl)
        console.log(chalk.bgGreen.black('Repository cloned to:') + " " + chalk.white("./" + repoDir))
      } catch (e) {
        console.log(chalk.bgRed.white('Failed to clone repository:') + " " + chalk.white(e.message))
        return
      }
    } else {
      console.log(chalk.bgYellow.black('Repository already exists at:') + " " + chalk.white("./" + repoDir))
    }
    console.log(chalk.bgBlue.white('To start the server, run:') + " " + chalk.bold.bgBlack.white('cd mono/server && python3 docker.py'))
  })

program
  .command("authenticate")
  .description("Authenticate user (store username and password in local JSON)")
  .action(() => {
    inquirer.prompt([
      { type: "input", name: "username", message: "Enter your username:" },
      { type: "password", name: "password", message: "Enter your password:", mask: "😀" }
    ]).then(function(answers) {
      saveAuth(answers.username, answers.password);
      console.log(chalk.bgGreen.black("Authentication successful for user:") + " " + chalk.bgBlue.white(answers.username))
    });
  });

var sync = program.command("sync").description("Sync operations (local/remote)");

sync
  .command("local")
  .description("Clone a repository using the configured user and password")
  .action(() => {
    var auth = loadAuth();
    if (!auth) {
      console.log(chalk.bgRed.white("Authentication required. Please run 'monogear authenticate' first."))
      return;
    }
    inquirer.prompt([
      { type: "input", name: "repo", message: "Enter repository HTTPS URL to clone:" }
    ]).then(function(ans) {
      var repo = ans.repo;
      var repoUrl = new URL(repo);
      repoUrl.username = encodeURIComponent(auth.username);
      repoUrl.password = encodeURIComponent(auth.password);
      var folder = path.basename(repoUrl.pathname, ".git");
      simpleGit().clone(repoUrl.toString(), folder)
        .then(function() {
          console.log(chalk.bgGreen.black("Repository cloned to:") + " " + chalk.white("./" + folder))
        })
        .catch(function(err) {
          console.log(chalk.bgRed.white("Clone failed:") + " " + chalk.white(err.message))
        });
    });
  });

sync
  .command("remote")
  .description("Push local changes to remote using the configured user and password")
  .option("--branch <branch>", "Branch to push to")
  .action((opts) => {
    var auth = loadAuth()
if (!auth) {
  console.log(chalk.bgRed("Authentication required. Please run 'monogear authenticate' first."))
  return
}
inquirer.prompt([
  { type: "input", name: "repo", message: "Enter repository HTTPS URL to push to:" }
]).then(function(ans1) {
  inquirer.prompt([
    { type: "input", name: "message", message: "Enter commit message:", default: "monogear sync remote" }
  ]).then(function(ans2) {
    var repoUrl = new URL(ans1.repo)
    repoUrl.username = encodeURIComponent(auth.username)
    repoUrl.password = encodeURIComponent(auth.password)
    var git = simpleGit()
    git.add(".")
      .then(function() {
        return git.commit(ans2.message)
      })
      .then(function() {
        if (opts.branch) {
          return git.push([repoUrl.toString(), "HEAD:" + opts.branch])
        } else {
          return git.push([repoUrl.toString()])
        }
      })
      .then(function() {
        console.log(chalk.bgGreen.black("Push to remote repository completed."))
      })
      .catch(function(err) {
        console.log(chalk.bgRed.white("Push failed:") + " " + chalk.white(err.message))
      })
  })
})
  });

program
  .command("make-repo")
  .description("Create a new repo (beginner style)")
  .action(async () => {
    const ans = await inquirer.prompt([
      { type: "input", name: "name", message: "Repo name?" }
    ]);
    const name = ans.name;
    if (!name) {
      console.log(chalk.bgYellow.black('Please enter a repository name.'))
      return
    }
    if (name.indexOf("/") !== -1 || name.endsWith(".git")) {
      console.log(chalk.bgRed.white('Invalid repository name.'))
      return
    }
    axios.get("http://localhost:8000/dashboard/new/" + name)
      .then(function(res) {
        if (res.data.created) {
          console.log(chalk.bgGreen.black('Repository created:') + " " + chalk.white(name))
        } else if (res.data.error) {
          console.log(chalk.bgRed.white('Error:') + " " + chalk.white(res.data.error))
        } else {
          console.log(chalk.gray('Unknown error occurred while creating repository.'))
        }
      })
      .catch(function(e) {
        console.log(chalk.bgRed.white('Error:') + " " + chalk.white(e.message))
      })
  });

program
  .command("history")
  .description("Show git history (beautiful and elegant)")
  .action(() => {
    var git = simpleGit()
    git.log().then(function(log) {
      var sep = chalk.bgGray(' '.repeat(60))
      console.log('\n' + sep)
      console.log(chalk.bold.bgBlack.white('   Git Commit History   ').padEnd(60))
      console.log(sep)
      for (var i = 0; i < log.all.length; i++) {
        var c = log.all[i]
        var hash = chalk.bgWhite.black.bold(' ' + c.hash.substring(0,7) + ' ')
        var author = chalk.bgCyan.black(' ' + c.author_name + ' ')
        var date = chalk.bgBlue.white(' ' + c.date.split('T')[0] + ' ')
        var msg = chalk.bgBlack.white(' ' + c.message + ' ')
        console.log('  ' + hash + '  ' + author + '  ' + date)
        console.log('      ' + msg + '\n')
      }
      console.log(sep + '\n')
    }).catch(function(e) {
      console.log(chalk.bgRed.white('  Error: ') + chalk.white(e.message))
    })
  })

program
  .command("checkout-prev")
  .description("Checkout a previous commit interactively (colorful)")
  .action(() => {
    var git = simpleGit()
    git.log().then(function(log) {
      var choices = []
      for (var i = 0; i < log.all.length; i++) {
        var c = log.all[i]
        var hash = chalk.hex('#FF6F00').bold.underline(c.hash.substring(0,7))
        var msg = chalk.hex('#FFD700').italic(c.message)
        var author = chalk.hex('#00BFFF').bold(c.author_name)
        choices.push({ name: hash + chalk.gray(' | ') + msg + chalk.gray(' by ') + author, value: c.hash })
      }
      inquirer.prompt([
        { type: "list", name: "commit", message: chalk.bgBlackBright.bold("Select a commit to checkout:"), choices: choices }
      ]).then(function(ans) {
        git.checkout(ans.commit).then(function() {
          console.log(
            chalk.bgGreen.black.bold("\nChecked out commit:") +
            ' ' + chalk.bgBlackBright.bold(ans.commit.substring(0,7)) +
            chalk.bgGreen.black.bold(" successfully.\n")
          )
        }).catch(function(e) {
          console.log(chalk.bgRed("Failed: ") + e.message)
        })
      })
    }).catch(function(e) {
      console.log(chalk.bgRed("Error: ") + e.message)
    })
  })

program
  .command("status")
  .description("Show git status (beginner style)")
  .action(() => {
    let git = simpleGit();
    git.status().then(function(status) {
      if (status.files.length === 0) {
        console.log(chalk.bgGreenBright(" Clean repo! "));
      } else {
        for (let i = 0; i < status.files.length; i++) {
          let f = status.files[i];
          console.log(chalk.bgRedBright(f.path + " " + f.working_dir + " " + f.index));
        }
      }
    }).catch(function(e) {
      console.log(chalk.bgRed(" Status error: ") + e.message);
    });
  });

program
  .command("diff")
  .description("Show a colored diff of unstaged changes")
  .action(() => {
    let git = simpleGit();
    git.diff().then(function(diff) {
      if (diff && diff.length > 0) {
        console.log(chalk.bgMagentaBright(diff));
      } else {
        console.log(chalk.bgGreenBright(" No unstaged changes! "));
      }
    }).catch(function(e) {
      console.log(chalk.bgRed(" Diff error: ") + e.message);
    });
  });

program
  .command("stash")
  .description("Stash current changes and list stashes interactively")
  .action(() => {
    let git = simpleGit();
    inquirer.prompt([
      { type: "list", name: "action", message: "Stash or view stashes?", choices: ["Create stash", "List stashes", "Apply stash"] }
    ]).then(function(ans) {
      if (ans.action === "Create stash") {
        git.stash().then(function() {
          console.log(chalk.bgYellowBright(" Changes stashed! "));
        });
      } else if (ans.action === "List stashes") {
        git.stashList().then(function(stashes) {
          for (let i = 0; i < stashes.all.length; i++) {
            console.log(chalk.bgBlueBright(i + ": " + stashes.all[i].message));
          }
        });
      } else if (ans.action === "Apply stash") {
        git.stashList().then(function(stashes) {
          if (stashes.total === 0) {
            console.log(chalk.bgRedBright(" No stashes! "));
            return;
          }
          let choices = [];
          for (let i = 0; i < stashes.all.length; i++) {
            choices.push({ name: i + ": " + stashes.all[i].message, value: i });
          }
          inquirer.prompt([
            { type: "list", name: "idx", message: "Pick stash to apply:", choices: choices }
          ]).then(function(ans2) {
            git.stash(["apply", "stash@{" + ans2.idx + "}"]).then(function() {
              console.log(chalk.bgGreenBright(" Applied stash " + ans2.idx + "! "));
            });
          });
        });
      }
    });
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
