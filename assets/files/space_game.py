"""
This is the start of our "space" style game
April 3rd 2023 Anirudh Chhabra
"""
import sys
import os
import turtle
import random
import math
import time

os.chdir("gifs")
#Register shapes
turtle.register_shape("playerup_1.gif")
turtle.register_shape("playerup_2.gif")
turtle.register_shape("playerup_3.gif")
turtle.register_shape("playerleft_1.gif")
turtle.register_shape("playerleft_2.gif")
turtle.register_shape("playerleft_3.gif")
turtle.register_shape("playerright_1.gif")
turtle.register_shape("playerright_2.gif")
turtle.register_shape("playerright_3.gif")
turtle.register_shape("playerdown_1.gif")
turtle.register_shape("playerdown_2.gif")
turtle.register_shape("playerdown_3.gif")
turtle.register_shape("enemy1.gif")
turtle.register_shape("enemy2.gif")
turtle.register_shape("pm_right.gif")
turtle.register_shape("pm_left.gif")
turtle.register_shape("pm_up.gif")
turtle.register_shape("pm_down.gif")
turtle.register_shape("em_right.gif")
turtle.register_shape("em_left.gif")
turtle.register_shape("em_up.gif")
turtle.register_shape("em_down.gif")
turtle.register_shape("background.gif")

#Make a screen
wn = turtle.Screen()
turtle.bgcolor("black")
turtle.bgpic("background.gif")

#Make a turtle to create border
border=turtle.Turtle()
border.color("green")
border.pensize(5)
border.speed(0)
border.penup()
border.goto(-250,300)
border.pendown()
border.forward(500)
border.right(90)
border.forward(600)
border.right(90)
border.forward(500)
border.right(90)
border.forward(600)

#Make the player turtle
player=turtle.Turtle()
player.color("yellow")
player.pensize(3)
player.speed(0)
player.setheading(90)
player.shape("playerup_1.gif")

#The amount of pixels moved per frame
player_speed=25

#Make the enemy turtle
enemy=turtle.Turtle()
enemy.color("cyan")
enemy.pensize(5)
enemy.speed(0)
enemy.penup()
enemy.goto(-240,285)

enemy_speed=10

#Make projectile turtle for player's missile
pt_player=turtle.Turtle()
pt_player.color("Orange")
pt_player.shape("pm_right.gif")
pt_player.penup()
pt_player.hideturtle()
pt_player.speed(0)

#Make projectile turtle for enemy's missile
pt_enemy=turtle.Turtle()
pt_enemy.color("green")
pt_enemy.shape("em_right.gif")
pt_enemy.penup()
pt_enemy.hideturtle()

#To make a counter variable that counts the number of collisions
c=0

#This function returns if the turtles t1 and t2 are d apart
def is_collision(t1,t2,d):
    x_diff=math.pow(t1.xcor()-t2.xcor(),2)
    y_diff=math.pow(t1.ycor()-t2.ycor(),2)
    distance=math.sqrt(x_diff+y_diff)
    
    if distance<= d:
        return True
    else:
        return False
        
def move_left():
    player.setheading(180)
    x=player.xcor()
    x-=player_speed
    player.setx(x)

def move_right():
    player.setheading(0)
    x=player.xcor()
    x+=player_speed
    player.setx(x)

def move_up():
    player.setheading(90)
    y=player.ycor()
    y+=player_speed
    player.sety(y)

def move_down():
    player.setheading(270)
    y=player.ycor()
    y-=player_speed
    player.sety(y)    
    
def pt_player_move():
    global c  # Ensure we can modify the global variable
    pt_player.setposition(player.xcor(), player.ycor())
    pt_player.setheading(player.heading())
    if pt_player.heading() == 0:
        pt_player.shape("pm_right.gif")
    elif pt_player.heading() == 90:
        pt_player.shape("pm_up.gif")
    elif pt_player.heading() == 180:
        pt_player.shape("pm_left.gif")
    elif pt_player.heading() == 270:
        pt_player.shape("pm_down.gif")
    pt_player.showturtle()
    while abs(pt_player.xcor()) <= 250 and abs(pt_player.ycor()) <= 300:
        if is_collision(pt_player, enemy, 32):
            c = 0  # Reset collision counter
            player.color("yellow")
            enemy.penup()
            enemy.clear()
            enemy.goto(random.randint(-250, 250), random.randint(-300, 300))
            break  # Exit the loop once collision is detected
        pt_player.forward(15)
    pt_player.hideturtle()

""" 
def pt_enemy_move():
        pt_enemy.showturtle()
        if((round((enemy.xcor())/100)*100)==(round((player.xcor())/100)*100)):
            if(enemy.ycor()>player.ycor()):
                pt_enemy.setheading(270)
                pt_enemy.shape("em_down.gif")
            else:
                pt_enemy.setheading(90)
                pt_enemy.shape("em_up.gif")
        else:
            if(enemy.xcor()>player.xcor()):
                pt_enemy.setheading(180)
                pt_enemy.shape("em_left.gif")
            else:
                pt_enemy.setheading(0)
                pt_enemy.shape("em_right.gif")
        while(abs(pt_enemy.xcor())<=250 and abs(pt_enemy.ycor())<=300):
            if is_collision(pt_enemy,player,32):
                player.color("red")
                player.penup()
                player.clear()
                player.goto((random.randint(-250,250)),(random.randint(-300,300)))
                player.pendown()
            
            pt_enemy.forward(15)
        pt_enemy.hideturtle()
"""

#Create keyboard bindings
turtle.listen()
turtle.onkeypress(move_left, "Left")
turtle.onkeypress(move_right, "Right")
turtle.onkeypress(move_up,"Up")
turtle.onkeypress(move_down,"Down")
turtle.onkeypress(pt_player_move," ")

while(True):
    player.forward(0)
    if (player.heading()==0):
        player.shape("playerright_3.gif")
        player.shape("playerright_2.gif")
        player.shape("playerright_1.gif")
    if (player.heading()==180):
        player.shape("playerleft_3.gif")
        player.shape("playerleft_2.gif")
        player.shape("playerleft_1.gif")
    if (player.heading()==90):
        player.shape("playerup_3.gif")
        player.shape("playerup_2.gif")
        player.shape("playerup_1.gif")
    if (player.heading()==270):
        player.shape("playerdown_3.gif")
        player.shape("playerdown_2.gif")
        player.shape("playerdown_1.gif")
    enemy.shape("enemy2.gif")
    enemy.shape("enemy1.gif")
    enemy.forward(enemy_speed)
    pt_player.goto(player.xcor(),player.ycor())
    pt_player.setheading(player.heading())
    pt_enemy.goto(enemy.xcor(),enemy.ycor())
    pt_enemy.setheading(enemy.heading())
    if is_collision(player,enemy,32):
        c=c+1
        player.color("red")
        enemy.penup()
        enemy.clear()
        enemy.goto((random.randint(-250,250)),(random.randint(-300,300)))
    if is_collision(pt_player, enemy, 32):
        c = 0
    if  ((round((enemy.xcor())/100)*100)==(round((player.xcor())/100)*100) or (round((enemy.ycor())/100)*100)==(round((player.ycor())/100)*100)):
        #pt_enemy_move()
        pt_enemy.showturtle()
        if((round((enemy.xcor())/100)*100)==(round((player.xcor())/100)*100)):
            if(enemy.ycor()>player.ycor()):
                pt_enemy.setheading(270)
                pt_enemy.shape("em_down.gif")
            else:
                pt_enemy.setheading(90)
                pt_enemy.shape("em_up.gif")
        else:
            if(enemy.xcor()>player.xcor()):
                pt_enemy.setheading(180)
                pt_enemy.shape("em_left.gif")
            else:
                pt_enemy.setheading(0)
                pt_enemy.shape("em_right.gif")
        while(abs(pt_enemy.xcor())<=250 and abs(pt_enemy.ycor())<=300):
            if is_collision(pt_enemy,player,32):
                c=c+1
                player.color("red")
                player.penup()
                player.clear()
                player.goto((random.randint(-250,250)),(random.randint(-300,300)))
                player.pendown()
            
            pt_enemy.forward(15)
        pt_enemy.hideturtle()
    if abs(enemy.xcor())>=250:
        enemy.right(180)
        enemy.sety(enemy.ycor()-10)
    if abs(enemy.ycor())>=300:
        enemy.clear()
        enemy.penup()
        enemy.goto(-240,285)
        
    if abs(player.xcor())>250:
        player.penup()
        player.clear()
        player.setx((-player.xcor()/abs(player.xcor()))*250)
        player.pendown()
    if abs(player.ycor())>300:
        player.penup()
        player.clear()
        player.sety((-player.ycor()/abs(player.ycor()))*300)
        player.pendown()
    if c == 2:
        wn.clear()  # Clear the screen
        wn.bgcolor("black")  # Set background color to black
        game_over_turtle = turtle.Turtle()  # Create a new turtle for the message
        game_over_turtle.hideturtle()
        game_over_turtle.color("red")
        game_over_turtle.penup()
        game_over_turtle.goto(0, 0)
        game_over_turtle.write(
            "GAME OVER", align="center", font=("Courier", 36, "bold")
        )
        time.sleep(3)  # Pause to display the message
        sys.exit(0)  # Terminate the program
    
    time.sleep(0.0333)
    

time.sleep(3)