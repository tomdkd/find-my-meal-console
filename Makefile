DOCKER=docker-compose

install:
	${DOCKER} down
	${DOCKER} build
	${DOCKER} up -d
	docker cp ./database_schema.sql find_my_meal_console-mysql-1:/
	sleep 2
	${DOCKER} exec nodejs npm run build

install-dep:
	@if [ -z "$(dependency)" ]; then \
		echo "Usage: make install-dep dependency=<dependency>"; \
		exit 1; \
	fi
	${DOCKER} exec nodejs npm install $(dependency)

remove-dep:
	@if [ -z "$(dependency)" ]; then \
		echo "Usage: make remove-dep dependency=<dependency>"; \
		exit 1; \
	fi
	${DOCKER} exec nodejs npm remove $(dependency)

update-dep:
	${DOCKER} exec nodejs npm update

connect:
	${DOCKER} exec nodejs /bin/sh