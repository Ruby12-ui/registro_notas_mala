# ── Etapa 1: build ──────────────────────────────────────────────
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copiar wrapper y pom primero (cache de dependencias)
COPY .mvn/ .mvn/
COPY mvnw mvnw.cmd pom.xml ./

RUN chmod +x mvnw && ./mvnw dependency:go-offline -q

# Copiar fuentes y compilar
COPY src ./src
RUN ./mvnw package -DskipTests -q

# ── Etapa 2: runtime ─────────────────────────────────────────────
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
