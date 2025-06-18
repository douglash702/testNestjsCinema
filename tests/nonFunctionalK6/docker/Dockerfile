FROM grafana/k6:latest

WORKDIR /test

COPY ../package.json .

COPY ../data /dynamic
COPY ../test  .
COPY ../results .
COPY ../services .
COPY support /support


EXPOSE 3000

ENTRYPOINT ["k6"]

