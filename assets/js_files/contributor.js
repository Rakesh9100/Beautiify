const cont = document.getElementById('contributor');

async function fetchContributors(pageNumber) {
    const perPage = 100;
    const apiUrl = '/.netlify/functions/contributors'; // Netlify serverless function path

    const response = await fetch(`${apiUrl}?page=${pageNumber}&per_page=${perPage}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch the contributors data. Status code: ${response.status}`);
    }

    const contributorsData = await response.json();
    return contributorsData;
}

async function fetchAllContributors() {
    let allContributors = [];
    let pageNumber = 1;
    const maxPages = 10;  // Limiting the number of pages to avoid overload (can be adjusted)

    try {
        // Fetch all contributors in parallel using Promise.all()
        const fetchPromises = [];

        // Fetch data for multiple pages concurrently
        for (let i = 1; i <= maxPages; i++) {
            fetchPromises.push(fetchContributors(i));
        }

        const contributorsArray = await Promise.all(fetchPromises);

        // Combine all the results
        contributorsArray.forEach(contributorsData => {
            allContributors = allContributors.concat(contributorsData);
        });

        // Display contributor cards
        allContributors.forEach((contributor) => {
            if (contributor.login === 'Rakesh9100') return;  // Skip owner

            const contributorCard = document.createElement('div');
            contributorCard.classList.add('contributor-card');

            const avatarImg = document.createElement('img');
            avatarImg.src = contributor.avatar_url;
            avatarImg.alt = `${contributor.login}'s Picture`;

            const loginLink = document.createElement('a');
            loginLink.href = contributor.html_url;
            loginLink.target = '_blank';
            loginLink.appendChild(avatarImg);

            // Fetch detailed info for the name
            fetch(contributor.url)
                .then(contributorDetails => contributorDetails.json())
                .then(contributorData => {
                    const displayName = contributorData.name || contributor.login;

                    const nameDiv = document.createElement('div');
                    nameDiv.classList.add('contributor-name');
                    nameDiv.textContent = displayName;

                    contributorCard.appendChild(loginLink);
                    contributorCard.appendChild(nameDiv);

                    cont.appendChild(contributorCard);
                })
                .catch(error => console.error('Error fetching the contributor details:', error));
        });
    } catch (error) {
        console.error('Error fetching the contributors:', error);
    }
}

fetchAllContributors();