####
FROM gradle:jdk17-alpine as builder

WORKDIR /app

COPY . /app

RUN ls -la

RUN gradle clean build -x test

FROM registry.access.redhat.com/ubi8/openjdk-17:1.20

ENV LANGUAGE='en_US:en'

COPY --from=builder --chown=185 /app/build/quarkus-app/lib/ /deployments/lib/
COPY --from=builder --chown=185 /app/build/quarkus-app/*.jar /deployments/
COPY --from=builder --chown=185 /app/build/quarkus-app/app/ /deployments/app/
COPY --from=builder --chown=185 /app/build/quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 8888
USER 185
ENV JAVA_OPTS_APPEND="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"

ENTRYPOINT [ "/opt/jboss/container/java/run/run-java.sh" ]