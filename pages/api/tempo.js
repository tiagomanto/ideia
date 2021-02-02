async function tempo(request, response) {
  const apiSecret = process.env.CONVERTKIT_API_SECRET;
  const dynamicDate = new Date();

  const subscribersResponse = await fetch(`https://api.convertkit.com/v3/subscribers?api_secret=${apiSecret}`);
  const subscribersResponseJson = await subscribersResponse.json();
  const inscritos = subscribersResponseJson.total_subscribers;

  //cria um cache no servidor com o minimo 10 segundos e responde 
  //as requests instantaneamente enquanto a vercel atualiza o cache apos 10 segundos
  response.setHeader('Cache-Control','s-maxage=10, stale-while-revalidate');

  response.json({
      date: dynamicDate.toGMTString(),
      inscritos: inscritos
  });
}

export default tempo;