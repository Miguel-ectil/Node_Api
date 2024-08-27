import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`O servidor está sendo executado na porta ${PORT}`);
});
