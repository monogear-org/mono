import os
project_name="a2k"

port_mapping = {
    "5000":"5000"
}

os.system(f"docker build -t {project_name}:latest .")
os.system(f"docker run --rm --name test {' '.join('-p '+str(x)+':'+str(y) for x,y in port_mapping.items())} {project_name}")