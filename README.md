# FIND MY MEAL (console edition)

## DESCRIPTION
Find My Meal is an application for you to give you ideas for your meals. Give him a file with meals you want and what you should have to do it and, when you don't have any ideas of what to prepare, ask him to give you ideas and generate the list of what you should buy !

## INSTALLATION
Run the command ```make install```. \
Then run the command ```docker exec find_my_meal_console-mysql-1 mysql -uroot -proot find_my_meal_console < database_schema.sql``` to create required table and give user the right access.

## USAGE
Use the command ```make connect``` to go inside the container. Now, you can use the command ```node dist/app.js``` to launch the application.