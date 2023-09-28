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

enum ImpressionType {
    comment,
    stars
}

class ImpressionComment {

    constructor(newComment : string) {
        this.comment = newComment
    }

    type = ImpressionType.comment
    comment: string
}

class ImpressionStars {

    constructor(newStars : number) {
        this.numStars = newStars
    }

    type = ImpressionType.stars
    numStars: number
}

class Rating {

    // public readonly venueId : string
    public readonly visitorName : string
    public readonly impression : ImpressionComment | ImpressionStars

    constructor(newName : string, newImpression : ImpressionComment | ImpressionStars) {
        //this.venueId = newVenueId
        this.visitorName = newName
        this.impression = newImpression
    }
}

const stars = ["⭐️", "⭐️⭐️", "⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️⭐️"]

type ParkWithRating = [ Park, Rating[] ]

// variables -----------------------------------------------------

var venueCatalogue : ParkWithRating[] = []

venueCatalogue.push(
    // make a new tuple
    [
        new Park("p001", "Yosemite", "Home of the Half Dome and El Capitan.", "California", "images/yosemite.jpg"),

        // array of ratings
        [
            new Rating("Katie", new ImpressionComment("Best park ever!")),
            new Rating("Mike", new ImpressionComment("How did I not do this sooner?")),
            new Rating("Johan", new ImpressionComment("Classic, a must-see!")),
            new Rating("Hector", new ImpressionStars(4)),
            new Rating("Vidya", new ImpressionStars(5))
        ]
    ]
)

venueCatalogue.push(
    // make a new tuple
    [
        new Park("p002", "Yellowstone", "The first national park of the United States.", "Wyoming", "images/yellowstone.jpg"),

        // array of ratings
        [
            new Rating("Katie", new ImpressionComment("Sensational! Book early in the summer!")),
            new Rating("Mike", new ImpressionComment("It was amazing!")),
            new Rating("Johan", new ImpressionComment("Simply inspirational!"))
        ]
    ]
)

venueCatalogue.push(
    // make a new tuple
    [
        new Park("p003", "Volcano", "New lands in the making. Witness Mother Nature at work!", "Hawaii", "images/volcano.jpg"),

        // array of ratings
        [
            new Rating("Syd", new ImpressionStars(5)),
            new Rating("Peter", new ImpressionStars(3)),
            new Rating("X. Zheng", new ImpressionStars(4)),
            new Rating("Han", new ImpressionComment("Felt like out of this world!"))
        ]
    ]
)

venueCatalogue.push(
    // make a new tuple
    [
        new Park("p004", "Zion", "Follow the paths where ancient native people and pioneers walked.", "Utah", "images/zion.jpg"),

        // array of ratings
        [
            new Rating("Jim", new ImpressionComment("How did I not do this sooner?")),
            new Rating("S. Patel", new ImpressionComment("Classic, a must-see!")),
            new Rating("Gloria", new ImpressionStars(3)),
            new Rating("Samuel G.", new ImpressionStars(4))
        ]
    ]
)

venueCatalogue.push(
    // make a new tuple
    [
        new Park("p005", "Acadia", "Highest rocky headlands along the Atlantic coastline of the United States.", "Maine", "images/acadia.jpg"),

        // array of ratings
        []
    ]
)

venueCatalogue.push(
    // make a new tuple
    [
        new Park("p006", "Denali", "Solitude, tranquility and wilderness await.", "Alaska", "images/denali.jpg"),

        // array of ratings
        []
    ]
)

// functions -----------------------------------------------------


function buildImpressionSectionFor(ratingsForVenue : Rating[]) : string {

    //const ratingsForVenue = ratings.filter(entry => entry.venueId == targetVenueId)

    var resultString = ""

    const htmlTemplate = 
    `<p class="park-rating">~~impression~~ - ~~visitor-name~~</p>`

    ratingsForVenue.forEach(entry => {
        
        var entryHtml = ""
        
        switch(entry.impression.type) {
        
            case ImpressionType.comment:
                entryHtml = htmlTemplate.replace("~~impression~~", (entry.impression as ImpressionComment).comment)
                break

            case ImpressionType.stars:

                const startsGiven = (entry.impression as ImpressionStars).numStars

                if (startsGiven >= 1 && startsGiven <= 5) {
                    entryHtml = htmlTemplate.replace("~~impression~~", stars[startsGiven-1])
                }
                break

            default:
                    throw new Error("unknown impression type")

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

        rowHTML = rowHTML.replace("~~image~~", park[0].image)
        rowHTML = rowHTML.replace("~~name~~", park[0].name.toUpperCase())
        rowHTML = rowHTML.replace("~~location~~", park[0].location)
        rowHTML = rowHTML.replace("~~description~~", park[0].description)
        rowHTML = rowHTML.replace("~~impression-section~~", buildImpressionSectionFor(park[1]))

        row.innerHTML = rowHTML
    })
}

buildParkTable()