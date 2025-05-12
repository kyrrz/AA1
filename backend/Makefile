

start-dev-env:
	docker-compose -f docker-compose.dev.yml up -dev
	sleep 5


stop-dev-env:
	docker-compose -f docker-compose.dev.yml down

start-test:
	stop-dev-env
	sleep 5
	start-dev-env
	 
.PHONY: start-test start-dev-env stop-dev-env

