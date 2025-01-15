# Snake Game using Python Turtle
# Created by Anirudh Chhabra, Grade 10/11, November 2022

import turtle
import time
import random

# Game configuration
delay = 0.1
score = 0
high_score = 0

# Setup the screen
wn = turtle.Screen()
wn.title("Snake Game")
wn.bgcolor("black")
wn.setup(width=600, height=650)  # Height for scoreboard
wn.tracer(0)

# Draw border
border = turtle.Turtle()
border.speed(0)
border.color("white")
border.penup()
border.goto(-290, 290)  # Border to start at the correct position
border.pendown()
border.pensize(3)
for _ in range(4):
    border.forward(580)
    border.right(90)
border.hideturtle()

# Snake head
head = turtle.Turtle()
head.shape("square")
head.color("white")
head.penup()
head.goto(0, 0)
head.direction = "Stop"

# Food
food = turtle.Turtle()
food.shape("circle")
food.color("red")
food.penup()
food.goto(0, 100)

# Scoreboard
pen = turtle.Turtle()
pen.speed(0)
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0, 310)  # Scoreboard position above the border
pen.write("Score: 0  High Score: 0", align="center", font=("Courier", 24, "normal"))

# Snake body
segments = []

# Functions
def move():
    if head.direction == "up":
        head.sety(head.ycor() + 20)
    if head.direction == "down":
        head.sety(head.ycor() - 20)
    if head.direction == "left":
        head.setx(head.xcor() - 20)
    if head.direction == "right":
        head.setx(head.xcor() + 20)

def go_up():
    if head.direction != "down":
        head.direction = "up"

def go_down():
    if head.direction != "up":
        head.direction = "down"

def go_left():
    if head.direction != "right":
        head.direction = "left"

def go_right():
    if head.direction != "left":
        head.direction = "right"

def reset_game():
    global score, delay, high_score
    time.sleep(1)
    head.goto(0, 0)
    head.direction = "Stop"
    for segment in segments:
        segment.goto(1000, 1000)
    segments.clear()
    score = 0
    delay = 0.1
    update_score()

def update_score():
    pen.clear()
    pen.write(f"Score: {score}  High Score: {high_score}", align="center", font=("Courier", 24, "normal"))

# Keyboard bindings
wn.listen()
wn.onkeypress(go_up, "Up")
wn.onkeypress(go_down, "Down")
wn.onkeypress(go_left, "Left")
wn.onkeypress(go_right, "Right")

# Main game loop
while True:
    wn.update()

    # Check for collision with the wall
    if head.xcor() > 280 or head.xcor() < -280 or head.ycor() > 280 or head.ycor() < -280:
        reset_game()

    # Check for collision with the food
    if head.distance(food) < 20:
        x = random.randint(-270, 270)
        y = random.randint(-270, 270)
        food.goto(x, y)

        # Add a new segment
        new_segment = turtle.Turtle()
        new_segment.speed(0)
        new_segment.shape("square")
        new_segment.color("gray")
        new_segment.penup()
        segments.append(new_segment)

        # Increase the score
        score += 10
        if score > high_score:
            high_score = score
        update_score()

        # Speed up the game
        delay -= 0.001

    # Move the segments in reverse order
    for index in range(len(segments) - 1, 0, -1):
        x = segments[index - 1].xcor()
        y = segments[index - 1].ycor()
        segments[index].goto(x, y)

    # Move segment 0 to where the head is
    if len(segments) > 0:
        x = head.xcor()
        y = head.ycor()
        segments[0].goto(x, y)

    move()

    # Check for collision with the body
    for segment in segments:
        if segment.distance(head) < 20:
            reset_game()

    time.sleep(delay)

wn.mainloop()
