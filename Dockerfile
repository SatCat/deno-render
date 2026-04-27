FROM denoland/deno:alpine-2.7.13
WORKDIR /app
COPY lock.json . 
RUN deno cache --frozen-lockfile --lock=lock.json https://deno.land/std@0.123.0/async/mod.ts || true

COPY . .
RUN deno cache --lock=lock.json index.ts
USER deno

EXPOSE 10000

CMD ["run", "--cached-only", "--allow-net", "index.ts"]
