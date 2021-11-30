build:
	docker build -t ${tag} .
clean:
	docker rmi -f ${tag}
run:
	docker run -d -p ${port}:${port} --name ${name} ${tag}
d:
	yarn run dev
s:
	yarn set version berry
i:
	yarn install