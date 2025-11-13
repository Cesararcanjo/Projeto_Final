@echo off
docker compose down -v

REM === compose-up.cmd (cmd.exe only) ===
REM Sobe o serviço definido em compose.yml no diretorio atual.
REM Pré-requisitos: Docker Desktop

docker --version >NUL 2>&1
IF ERRORLEVEL 1 (
  ECHO [ERRO] Docker nao encontrado no PATH. Instale/abra o Docker Desktop e tente novamente.
  EXIT /B 1
)

IF NOT EXIST compose.yml (
  ECHO [ERRO] Arquivo compose.yml nao encontrado no diretorio atual: %CD%
  EXIT /B 1
)

docker compose run --rm web bash -lc "npm ci || npm install"

docker compose up
