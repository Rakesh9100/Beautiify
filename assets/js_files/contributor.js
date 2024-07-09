const cont = document.getElementById('contributor');
const owner = 'Rakesh9100';
const repoName = 'Beautiify';

async function fetchContributors(pageNumber) {
    const perPage = 100;
    const url = `https://api.github.com/repos/${owner}/${repoName}/contributors?page=${pageNumber}&per_page=${perPage}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch contributors data. Status code: ${response.status}`);
    }
    const contributorsData = await response.json();
    return contributorsData;
}

async function fetchAllContributors() {
    try {
        let pageNumber = 1;
        let allContributors = [];
        let contributorsData;

        do {
            contributorsData = await fetchContributors(pageNumber);
            allContributors = allContributors.concat(contributorsData);
            pageNumber++;
        } while (contributorsData.length > 0);

        for (const contributor of allContributors) {
            if(contributor.login === owner){
                continue;
            }
            const userDetailsResponse = await fetch(contributor.url);
            const userDetails = await userDetailsResponse.json();

            const contributorCard = document.createElement('div');
            contributorCard.classList.add('contributor-card');

            const avatarImg = document.createElement('img');
            avatarImg.src = contributor.avatar_url;
            avatarImg.alt = `${contributor.login}'s Picture`;

            const loginLink = document.createElement('a');
            loginLink.href = contributor.html_url;
            loginLink.target = '_blank';
            loginLink.appendChild(avatarImg);

            const nameOverlay = document.createElement('div');
            nameOverlay.classList.add('name-overlay');
            nameOverlay.textContent = userDetails.name || contributor.login;

            contributorCard.appendChild(loginLink);
            contributorCard.appendChild(nameOverlay);

            cont.appendChild(contributorCard);
        }
    } catch (error) {
        console.error(error);
    }
}

fetchAllContributors();
