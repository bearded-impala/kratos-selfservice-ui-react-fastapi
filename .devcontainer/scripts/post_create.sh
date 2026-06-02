#!/usr/bin/env zsh
set -euo pipefail

USER=vscode
SCRIPTS_DIR=$(realpath "$(dirname "$0")")

echo "Setting zsh theme to ys ..."
sed -i 's/^ZSH_THEME=".\+"$/ZSH_THEME="ys"/g' ~/.zshrc

echo "Configuring zsh_history..."
sudo mkdir -p /commandhistory
sudo touch /commandhistory/.zsh_history
sudo chown -R ${USER} /commandhistory
cat >> /home/${USER}/.zshrc <<'EOF'
autoload -Uz add-zsh-hook
append_history() { fc -W }
add-zsh-hook precmd append_history
export HISTFILE=/commandhistory/.zsh_history
EOF
echo -e "Configuring zsh_history... \033[32;1mdone\033[0m"

echo "Adding zsh aliases..."
echo "alias poe='uv run poe'" >> /home/${USER}/.zshrc

bash "$SCRIPTS_DIR/docker_completion.sh"

echo "Installing backend deps (uv sync) ..."
uv sync

echo "Installing frontend deps (npm ci) ..."
(cd frontend && npm ci)

echo -e "\033[32;1mDevcontainer ready.\033[0m Try: uv run poe up"
