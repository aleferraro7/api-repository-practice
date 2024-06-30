SELECT 'CREATE DATABASE postgres_base'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'postgres_base')\gexec