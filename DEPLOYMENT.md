# Deployment Guide

## Environment Configuration

This application uses Spring profiles to manage different environments:
- **dev**: Development environment (local)
- **prod**: Production environment

### Development Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your local credentials

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   Or specify profile explicitly:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   ```

### Production Deployment

**IMPORTANT**: Never hardcode sensitive values in production config files!

#### Option 1: Environment Variables (Recommended)

Set environment variables on your production server:

```bash
export SPRING_PROFILES_ACTIVE=prod
export DB_URL=jdbc:mysql://prod-server:3306/authify_app
export DB_USERNAME=prod_user
export DB_PASSWORD=secure_password
export JWT_SECRET_KEY=your_production_secret_key
export JWT_EXPIRATION_MS=3600000
export SMTP_HOST=smtp-relay.brevo.com
export SMTP_PORT=587
export SMTP_USERNAME=your_smtp_username
export SMTP_PASSWORD=your_smtp_password
export SMTP_FROM=noreply@yourdomain.com
```

Then run:
```bash
java -jar target/authify-*.jar
```

#### Option 2: External Configuration File

Create an `application-prod.properties` file outside your JAR:

```bash
java -jar target/authify-*.jar --spring.config.location=file:/path/to/config/
```

#### Option 3: Command Line Arguments

```bash
java -jar target/authify-*.jar \
  --spring.profiles.active=prod \
  --spring.datasource.url=jdbc:mysql://prod-server:3306/authify_app \
  --spring.datasource.username=prod_user \
  --spring.datasource.password=secure_password
```

### Docker Deployment

Use environment variables in your `docker-compose.yml`:

```yaml
services:
  authify:
    image: authify:latest
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_URL=jdbc:mysql://mysql:3306/authify_app
      - DB_USERNAME=${DB_USERNAME}
      - DB_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
```

### Security Best Practices

1. ✅ Use environment variables for all sensitive data
2. ✅ Never commit `.env` files to version control
3. ✅ Use different credentials for dev and prod
4. ✅ Use `validate` for `spring.jpa.hibernate.ddl-auto` in production
5. ✅ Rotate secrets regularly
6. ✅ Use secret management tools (AWS Secrets Manager, HashiCorp Vault, etc.)
