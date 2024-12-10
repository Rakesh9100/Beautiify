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
    let allContributors = [];
    let pageNumber = 1;

    try {
        while (true) {
            const contributorsData = await fetchContributors(pageNumber);
            if (contributorsData.length === 0) {
                break;
            }
            allContributors = allContributors.concat(contributorsData);
            pageNumber++;
        }

        for (let contributor of allContributors) {
            if (contributor.login === owner) {
                continue;
            }

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
            const contributorDetails = await fetch(contributor.url);
            const contributorData = await contributorDetails.json();
            const displayName = contributorData.name || contributor.login;

            const nameDiv = document.createElement('div');
            nameDiv.classList.add('contributor-name');
            nameDiv.textContent = displayName;

            contributorCard.appendChild(loginLink);
            contributorCard.appendChild(nameDiv);

            cont.appendChild(contributorCard);
        }
    } catch (error) {
        console.error(error);
    }
}

fetchAllContributors();
