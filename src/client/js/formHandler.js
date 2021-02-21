function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('name').value
    if(Client.urlChecker(formText)) {
        fetch('http://localhost:8080/body', {
            method: "POST",
            credentials: "same-origin",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({url: formText}),
        })
        .then(res => {
            return res.json()
        })
        .then(function(data) {
            //   console.log("data----------------------- ", data);
            // document.getElementById('results').innerHTML = data.message
            // document.getElementById('text').innerHTML = data.text
            document.getElementById('score_tag').innerHTML = 'score_tag:  ' + data.score_tag
            document.getElementById('confidence').innerHTML = 'confidence: '+ data.confidence
            document.getElementById('agreement').innerHTML = 'agreement: ' + data.agreement
            document.getElementById('irony').innerHTML = 'irony: ' + data.irony
            if(data.sentence_list[0]){
                document.getElementById('segment').innerHTML = 'segment: ' + data.sentence_list[0].segment_list[0];
            }
        })
    }
}

export { handleSubmit }
