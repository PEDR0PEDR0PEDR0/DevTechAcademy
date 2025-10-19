# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Copia todos os arquivos estáticos (index.html, script.js, etc.) 
# para o diretório padrão de documentos do Nginx
COPY . /usr/share/nginx/html

# O Nginx escuta na porta 80 por padrão, que é a porta que vamos expor.
EXPOSE 80