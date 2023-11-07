build:
	docker build --no-cache -t product-bot-admin .

deploy: build
	docker run -d -p 1024:80 --name product-bot-admin -t product-bot-admin