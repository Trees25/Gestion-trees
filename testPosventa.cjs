const url = 'https://fvzirbamdaawyytorfym.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2emlyYmFtZGFhd3l5dG9yZnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMzY5NzksImV4cCI6MjA4NjcxMjk3OX0.DWDmnrbXSYqmY4No_aEcT79wOpFGWVUVD411Zy-HryM';

async function test() {
    const res = await fetch(`${url}/rest/v1/?apikey=${key}`);
    const json = await res.json();
    console.log("Root keys:", Object.keys(json));
    if (json.info) console.log("Info:", json.info);
    if (json.paths) {
      console.log("Paths count:", Object.keys(json.paths).length);
      console.log("Has suscripciones?", !!json.paths['/suscripciones']);
      if (json.paths['/suscripciones']) {
        console.log("Suscripciones HTTP methods:", Object.keys(json.paths['/suscripciones']));
      }
    }
}
test().catch(console.error);
