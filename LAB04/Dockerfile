# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Copia todos os arquivos estáticos (index.html, script.js, etc.) 
# para o diretório padrão de documentos do Nginx
COPY . /usr/share/nginx/html

# A porta que o Nginx está escutando
EXPOSE 80