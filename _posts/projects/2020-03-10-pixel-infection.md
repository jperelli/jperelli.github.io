---
layout: page
title: Pixel Infection
comments: true
category: project
image: https://i.imgur.com/DP0DS0X.gif
---

I made a game about covid-19 spread in javascript. In this article I will explain the mechanics and how it was programmed. [You can see it working here](https://jperelli.com.ar/pixel-infection/)

## Idea

I was thinking about creating a simple game in javascript, but I wasn't motivatead about any particular theme.

Suddendly covid-19 was here, so after reading articles about the disease spreading and with much time to spare in front of the computer (isolating/social distancing), I started building a prototype with the spread of an infection as a core idea.

### Mechanics

It is a "resources" and "technology" advancing game in real time.

#### The player

The player is able to control the disease spreading in the population by applying the same policies that different countries are using currently with covid-19:

 - Social distancing encouraging
 - Travel ban (airports)
 - Lockdown (cities / areas) in full isolation
 - Private buildings repurposing (to hospitals)
 - Manage production resources efforts:
    - Vaccine research
    - ICU units
    - Hospital building

The policies are available via upgrades. Policies can only be applied after a threshold of infections, and the threshold depends on some population parameters (i.e. China has a more powerful state, USA has a more powerful private sector, therefore policies can be applied easier in China)

Applying policies affect the production, food, etc.

#### The population

There are some variables that make the population behave differently:

 - Production level (GDP)
 - Authority of government (easiness to apply policies)
 - Social distancing (Japan initially more than Italy)
 - Local movement amount
 - Airplane travel amount

 #### The disease

The disease is increasingly difficult to defeat, It can

 - Mutate
 - Have different incubation time
 - Have different transmission resistance

## Programming

I'm using [Pixi.js](https://www.pixijs.com/) as a game library and publishing as a static html+js files in [the repository](https://jperelli.com.ar/pixel-infection/)

### Initial prototype

Initially, I created a simple prototype to be able to try if I can program the mechanics and the disease spreading.

In Pixi, just like in most game frameworks, you get a main loop where you can do all the computation to graphic the next frame in the animation.

I added only 3 elements:

 - Map
    - dimensions: height, width
 - Person
    - sprite: x, y, image
    - state (ok, infected, dead)
    - infected date
 - Barrier
    - sprite: x, y, image

I created a javascript class for each element, I'll highlight here the Person

```typescript
class Person {
  // pixi
  sprite: PIXI.Sprite;
  bounds: PIXI.Rectangle;

  // position and movement
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  direction: number;
  turningSpeed: number;
  speed: number;

  // state
  infected: Date | null;
  recovered: boolean;
  dead: boolean;

  // attributes
  age: number;
  offsetMax: number; // sedentarism / auto-quarantine

  constructor({ country, texture, bounds }: PersonConstructorParams)

  // check if this person collides with any barrier
  collidesWithAny(barriers: Array<Barrier>)

  // calculate the next position x, y. Check if collides with any barrier
  moveStep(dt: number, barriers: Array<Barrier>)
}
```

A Person has a "base" location (x, y) and an offset position that has a maximum distance, it moves almost randomly in that area. That represents the local movement of a person in a community.

Depending on how much the population tends to "travel", there is a probability that the person changes the "base" location.

#### Main loop

There are 4 arrays of persons, each one for a different state

```typescript
  interface people: {
    dead: Array<Person>;
    recovered: Array<Person>;
    infected: Array<Person>;
    not_infected: Array<Person>;
  }
```

Then the main loop iterates over all the not-dead people and moves them to the recovered or dead state depending on some factors:

 - age
 - disease infection power

Using the the infected and uses a function to check if an infected person will infect another one depending on some factors:

 - distance
 - probability of infection

```typescript
    for (let i = this.people.infected.length - 1; i >= 0; i--) {
      const person = this.people.infected[i];
      const days_infected = (this.global_date.valueOf() - person.infected.valueOf()) / 1000 / 60 / 60 / 24
      if (days_infected > Config.DAYS_INCUBATION) {
          person.sprite.tint = 0xff0000;
      }
      if (days_infected > Config.DAYS_TO_CURE) {
        const [p] = this.people.infected.splice(i, 1);
        if (p.age < randn_bm(-200, 110, 0.25)) {
          p.recovered = true;
          p.sprite.tint = 0x00ff00;
          this.people.recovered.push(p);
        } else {
          p.dead = true;
          p.sprite.tint = 0xaaaaaa;
          this.people.dead.push(p);
        }
      }
    }

    // iterate through the people and infect the person near to an infected one
    let newinfected = [];
    for (let i = this.people.not_infected.length - 1; i >= 0; i--) {
      const person = this.people.not_infected[i];
      for (let j = this.people.infected.length - 1; j >= 0; j--) {
        const other = this.people.infected[j];
        if (
          Math.abs(other.sprite.x - person.sprite.x) +
            Math.abs(other.sprite.y - person.sprite.y) <
            Config.CONTAGION_RADIUS &&
          Math.random() < Config.CONTAGION_PROBABILITY
        ) {
          const [p] = this.people.not_infected.splice(i, 1);
          p.infected = this.global_date;
          newinfected.push(p);
          break;
        }
      }
    }
    this.people.infected.push(...newinfected);
```

[You can see the full source code here](https://github.com/jperelli/pixel-infection)

## Final note

The game is in progress and so this article :)
