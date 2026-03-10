# Use the mariadb image
FROM mariadb

# Copy all the files in the docker-entrypoint-initdb.d inside the container 
# which will run automatically when the sql server will start
COPY ./scripts/setup.sql /docker-entrypoint-initdb.d/
COPY online_retail_II.csv /docker-entrypoint-initdb.d/