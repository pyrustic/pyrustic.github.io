
function shuffleProjects()
{
    // get container and projects divs
    let container = document.getElementById("projects-div");
    let projects = container.children
    // shuffle elements
    shuffleElements(container, projects);
    // swap (image div vs description div)
    swap(projects);
}


function shuffleElements(container, elements)
{
    // Use randomNumber function and Node.insertBefore method to shuffle elements 
    let min = 0;
    let max = elements.length - 1;
    for (let i = 0; i < elements.length; i++)
    {
        let a = randomNumber(min, max);
        let b = randomNumber(min, max);
        if (a == b)
        {
            continue;
        }
        container.insertBefore(elements[a], elements[b]);
    }
}


function swap(elements)
{
    for (let i = 0; i < elements.length; i++)
    {
        // skip the element every other time
        if (i % 2 == 0)
        {
            continue;
        }
        // get project-body div or skip if it doesn't exist
        let child = elements[i];
        let cache = child.getElementsByClassName("project-body");
        if (cache.length != 1)
        {
            continue;
        }
        // edit order        
        let projectBody = cache[0];
        let imageDiv = projectBody.firstElementChild;
        let descriptionDiv = projectBody.lastElementChild;
        imageDiv.classList.add("order-1", "order-sm-1", "order-md-1", "order-lg-2");
        descriptionDiv.classList.add("order-2", "order-sm-2", "order-md-2", "order-lg-1");
    }
}


function randomNumber(min, max)
{ 
    let x = Math.random() * (max - min + 1);
    return Math.floor(x) + min;
}


// Shuffle the list of projects
shuffleProjects();
