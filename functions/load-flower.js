const fetch = require('node-fetch');

exports.handler = async () => {
    const corgis = await fetch("https://no-cors-api.netlify.app/api/corgis/")
    .then( res => res.json() );

    const fetchSingleImage = async id => {
        var singleImgUrl =  await fetch(`https://api.unsplash.com/photos/${id}`,
        {
            headers:{
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS}`
            }
        }
        ).then( res => res.json() ).then( data => data.urls.raw );
        console.log('single image', singleImgUrl);
        return singleImgUrl;
    }

    var myData = function getAllData (){
        return corgis.map( async x => {
            let photoUrl = await fetchSingleImage(x.id);
            console.log('photoUrl - ', photoUrl);
            return {
                ...x, 
                name: 'hello world', 
                url: photoUrl
            }
        });
        // console.log('photoUrl - ', unsplashData);

        // return unsplashData;
    }

    // var finalData = await getAllData();
    var finalData = await Promise.all(myData());
    console.log("final", finalData);

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalData)
    }
}