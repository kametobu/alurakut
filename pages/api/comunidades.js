import  { SiteClient }  from 'datocms-client';

export default async function recebedorDeRequests(request,response){
    if (request.method === "POST"){
            const TOKEN = "c81a14713403a512de5155dd8082f1";
            const client = new SiteClient(TOKEN);


            const registroCriado = await client.items.create({
                itemType: "966544",
                ...request.body,
                //title: "TESTE",
                //imageUrl: "https://github.com/kametobu.png",
                //creatorSlug: "kametobu"
            })

            response.json({
                dados: "Dados alguns",
                registroCriado: registroCriado
            })
            return;
    }

    response.status(404).json({
        menssagem: "Nada Ainda"
    })
}