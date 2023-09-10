export const effectLevels = {
    large: 1.75,
    medium: 1.5,
    low: 1.25
}

export const effectDirection = {
    increase: "Increase",
    decrease: "Decrease",
}

export const noEventText = "Electricity Demand is stable."

export const decreaseEvents = [
    {
        id: "D1",
        title: "High wind energy output",
        textStart: "Strong winds increase electricity generated from wind farms. Medium demand decrease expected shortly!",
        textEnd: "Winds have returned to normal. Production decrease from wind farms. Medium demand surge decrease shortly!",
        effect: effectLevels.low,
        direction: effectDirection.decrease,
    }
]

export const increaseEvents = [
    {
        id: "I1",
        title: "Reactor #7 is down",
        textStart: "Technical difficulties at reactor #7. Large demand surge expected shortly!",
        textEnd: "Reactor #7 will soon be back online. Large demand decrease expected shortly!",
        effect: effectLevels.large,
        direction: effectDirection.increase,
    },
    {
        id: "I2",
        title: "High demand from industry",
        textStart: "Temporary double-shifts were introduced at the industrial center. Medium demand surge expected shortly!",
        textEnd: "Temporary double-shifts at the industrial center ended. Medium demand decrease expected shortly!",
        effect: effectLevels.medium,
        direction: effectDirection.increase,
    },
    {
        id: "I3",
        title: "New Netflix series",
        textStart: "Everybody is about to watch the new series on Netflix. Low demand surge expected shortly!",
        textEnd: "Most people have finished wathcing the new episode. Low demand decrease decrease shortly!",
        effect: effectLevels.low,
        direction: effectDirection.increase,
    },
]
