import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  NATS_SERVER_URL: string;
  MQTT_URL: string;
  KAFKA_URL: string;
  KAFKA_CLIENTID: string;
  KAFKA_CONSUMER: string;
  MYSQL_ROOT_PASSWORD: string;
  MYSQL_DATABASE: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_PORT: number;
  MYSQL_HOST: string;
}
const envsSchema = joi
  .object({
    NATS_SERVER_URL: joi.string().required(),
    MQTT_URL: joi.string().required(),
    KAFKA_URL: joi.string().required(),
    KAFKA_CLIENTID: joi.string().required(),
    KAFKA_CONSUMER: joi.string().required(),
    MYSQL_ROOT_PASSWORD: joi.string().required(),
    MYSQL_DATABASE: joi.string().required(),
    MYSQL_USER: joi.string().required(),
    MYSQL_PASSWORD: joi.string().required(),
    MYSQL_PORT: joi.number().required(),
    MYSQL_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = value as Env;
