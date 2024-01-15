# FROM openjdk:19
# VOLUME /tmp
# EXPOSE 8080
# ARG JAR_FILE=target/server-0.0.1-SNAPSHOT.jar
# ADD ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]


FROM openjdk:18
WORKDIR /app
COPY ./target/server-0.0.1-SNAPSHOT.jar /app
EXPOSE 8080
CMD ["java", "-jar", "server-0.0.1-SNAPSHOT.jar"]