document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value;
    const suggestionsList = document.getElementById('suggestions');

    if (query.length > 0) {
        fetch(`https://api.duckduckgo.com/?q=${query}&format=json&no_redirect=1&no_html=1`)
            .then(response => response.json())
            .then(data => {
                suggestionsList.innerHTML = '';
                const relatedTopics = data.RelatedTopics;

                relatedTopics.forEach(topic => {
                    if (topic.Text) {
                        const suggestionText = topic.Text.split(' ').slice(0, 3).join(' ');
                        const li = document.createElement('li');
                        li.textContent = suggestionText;
                        li.addEventListener('click', () => {
                            document.getElementById('search-input').value = suggestionText;
                            suggestionsList.innerHTML = '';
                        });
                        suggestionsList.appendChild(li);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
                suggestionsList.innerHTML = '';
            });
    } else {
        suggestionsList.innerHTML = '';
    }
});