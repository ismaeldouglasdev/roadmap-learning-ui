#!/bin/bash

# Script para rodar o Roadmap UI

echo "🎮 Roadmap de Desenvolvimento - UI Gamificada"
echo "=============================================="
echo ""
echo "Opções:"
echo "1. Abrir versão standalone (sem instalação)"
echo "2. Rodar versão de desenvolvimento"
echo "3. Build para produção"
echo ""
read -p "Escolha uma opção (1-3): " choice

case $choice in
    1)
        echo "Abrindo index.standalone.html..."
        if command -v xdg-open &> /dev/null; then
            xdg-open index.standalone.html
        elif command -v open &> /dev/null; then
            open index.standalone.html
        else
            echo "Abra o arquivo index.standalone.html no navegador"
        fi
        ;;
    2)
        echo "Instalando dependências..."
        npm install
        echo "Iniciando servidor de desenvolvimento..."
        npm run dev
        ;;
    3)
        echo "Instalando dependências..."
        npm install
        echo "Fazendo build para produção..."
        npm run build
        echo "Build concluído! Arquivos em dist/"
        ;;
    *)
        echo "Opção inválida"
        ;;
esac