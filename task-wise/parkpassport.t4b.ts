class Park {

    public readonly id = ""
    public readonly name = ""
    public readonly description = ""
    public readonly location = ""
    public readonly image = ""

    constructor(id, name, description, location, image) {
        this.id = id
        this.name = name
        this.description = description
        this.location = location
        this.image = image
    }
}

class Rating {

    public readonly venueId : string
    public readonly visitorName : string
    public readonly impression : string | number

    constructor(newVenueId : string, newName : string, newImpression : string | number) {
        this.venueId = newVenueId
        this.visitorName = newName
        this.impression = newImpression
    }
}

const stars = ["⭐️", "⭐️⭐️", "⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️⭐️"]

// variables -----------------------------------------------------

var venueCatalogue : Park[] = []
venueCatalogue.push(new Park("p001", "Yosemite", "Home of the Half Dome and El Capitan.", "California", "images/yosemite.jpg"))
venueCatalogue.push(new Park("p002", "Yellowstone", "The first national park of the United States.", "Wyoming", "images/yellowstone.jpg"))
venueCatalogue.push(new Park("p003", "Volcano", "New lands in the making. Witness Mother Nature at work!", "Hawaii", "images/volcano.jpg"))
venueCatalogue.push(new Park("p004", "Zion", "Follow the paths where ancient native people and pioneers walked.", "Utah", "images/zion.jpg"))
venueCatalogue.push(new Park("p005", "Acadia", "Highest rocky headlands along the Atlantic coastline of the United States.", "Maine", "images/acadia.jpg"))
venueCatalogue.push(new Park("p006", "Denali", "Solitude, tranquility and wilderness await.", "Alaska", "images/denali.jpg"))

var ratings : Rating[] = []
ratings.push(new Rating("p001", "Katie", "Best park ever!"))
ratings.push(new Rating("p001", "Mike", "How did I not do this sooner?"))
ratings.push(new Rating("p001", "Johan", "Classic, a must-see!"))
ratings.push(new Rating("p001", "Hector", 4))
ratings.push(new Rating("p001", "Vidya", 5))

ratings.push(new Rating("p002", "Katie", "Sensational! Book early in the summer!"))
ratings.push(new Rating("p002", "Mike", "It was amazing!"))
ratings.push(new Rating("p002", "Marianne", "Simply inspirational!"))

ratings.push(new Rating("p003", "Syd", 5))
ratings.push(new Rating("p003", "Peter", 3))
ratings.push(new Rating("p003", "X. Zheng", 4))
ratings.push(new Rating("p003", "Han", "Felt like out of this world!"))

ratings.push(new Rating("p004", "Jim", "How did I not do this sooner?"))
ratings.push(new Rating("p004", "S. Patel", "Classic, a must-see!"))
ratings.push(new Rating("p004", "Gloria", 3))
ratings.push(new Rating("p004", "Samuel G.", 4))

// functions -----------------------------------------------------


function buildImpressionSectionFor(targetVenueId: string) : string {

    const ratingsForVenue = ratings.filter(entry => entry.venueId == targetVenueId)

    var resultString = ""

    const htmlTemplate = 
    `<p class="park-rating">~~impression~~ - ~~visitor-name~~</p>`

    ratingsForVenue.forEach(entry => {
        
        var entryHtml = ""
        
        switch(typeof entry.impression) {
        
        case "string":
            entryHtml = htmlTemplate.replace("~~impression~~", entry.impression)
            break

        case "number":
            if (entry.impression >= 1 && entry.impression <= 5) {
                entryHtml = htmlTemplate.replace("~~impression~~", stars[entry.impression-1])
            }
            break
        }

        entryHtml = entryHtml.replace("~~visitor-name~~", entry.visitorName)
        resultString += entryHtml
    })

    if (resultString.length > 0) {
        resultString = "<p class='reviews-heading'>What visitors say:</p><hr class='reviews-hr'>" + resultString
    }
    return resultString
}

function buildParkTable() {

    const htmlTemplate = 
   `<td class="park-image">
        <img class="park-image" src="~~image~~" alt="image">
    </td>
    <td>
        <p class="park-name">~~name~~</p>
        <p class="park-location">~~location~~</p>
        <p class="park-description">~~description~~</p>
        ~~impression-section~~
    </td>`

    let parkTable = <HTMLTableElement>document.getElementById("park-table")

    if (parkTable == null) return

    venueCatalogue.forEach((park, index) =>  {

        let row = parkTable.insertRow(index)
        row.className = "park-row"

        let rowHTML = htmlTemplate.replace("~~index~~", index.toString())

        rowHTML = rowHTML.replace("~~image~~", park.image)
        rowHTML = rowHTML.replace("~~name~~", park.name.toUpperCase())
        rowHTML = rowHTML.replace("~~location~~", park.location)
        rowHTML = rowHTML.replace("~~description~~", park.description)
        rowHTML = rowHTML.replace("~~impression-section~~", buildImpressionSectionFor(park.id))

        row.innerHTML = rowHTML
    })
}

buildParkTable()