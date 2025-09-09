import {z} from 'zod';

const environmentSchema = z.object({
  BACKEND_URL: z.string().url()
});
type Environment = z.infer<typeof environmentSchema>;

export const ENVIRONMENT = {} as Environment;

export async function loadEvironment() {
  const environmentResponse = await fetch('/environment.json');
  const environment = await environmentResponse.json();
  console.log('Loaded environment configuration', environment);

  const validatedEnv = environmentSchema.safeParse(environment);
  if (!validatedEnv.success) {
    console.error(`Environment configuration not valid: ${validatedEnv.error.message}`);
  }

  Object.assign(ENVIRONMENT, environment);
}