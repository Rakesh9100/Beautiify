// Use dynamic import for node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async function(event, context) {
    const token = process.env.GITHUB_TOKEN; // Access the token from the environment variables
    const page = event.queryStringParameters.page || 1;
    const perPage = event.queryStringParameters.per_page || 100;
    const owner = 'Rakesh9100';
    const repoName = 'Beautiify';

    const url = `https://api.github.com/repos/${owner}/${repoName}/contributors?page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}` // Use the token in the request header
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: `Failed to fetch the contributors data. Status code: ${response.status}`
            };
        }

        const contributorsData = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(contributorsData)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching the contributors' })
        };
    }
};