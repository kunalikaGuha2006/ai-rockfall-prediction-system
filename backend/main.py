from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import heapq

app = FastAPI()

# 🔥 CORS (VERY IMPORTANT FOR FRONTEND)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# 🔹 SENSOR DATA + PREDICTION
# =========================

@app.get("/sensor-data")
def get_sensor_data():
    rainfall = random.randint(10, 60)
    slope = random.randint(10, 60)
    soil_moisture = round(random.uniform(0.2, 0.8), 2)
    vibration = random.choice(["Low", "Medium", "High"])

    # 🔥 RULE-BASED PREDICTION
    if rainfall > 40 or slope > 45 or vibration == "High":
        risk = "HIGH"
    elif rainfall > 25 or slope > 30:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "rainfall": rainfall,
        "slope": slope,
        "soil_moisture": soil_moisture,
        "vibration": vibration,
        "Predicted Risk": risk
    }


# =========================
# 🔹 MANUAL PREDICT API
# =========================

@app.post("/predict")
def predict(data: dict):
    rainfall = data.get("rainfall", 0)
    slope = data.get("slope", 0)

    if rainfall > 40 or slope > 45:
        risk = "HIGH"
    elif rainfall > 25 or slope > 30:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "risk": risk
    }


# =========================
# 🔹 INCIDENTS (DYNAMIC)
# =========================

@app.get("/incidents")
def get_incidents():
    risks = ["LOW", "MEDIUM", "HIGH"]

    return [
        {
            "id": i,
            "risk": random.choice(risks),
            "message": f"{random.choice(risks)} risk detected at zone {i}"
        }
        for i in range(6)
    ]


# =========================
# 🔹 A* ROUTE (DEMO GRID)
# =========================

def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def astar(grid, start, goal):
    rows, cols = len(grid), len(grid[0])

    open_set = []
    heapq.heappush(open_set, (0, start))

    came_from = {}
    g_score = {start: 0}

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == tuple(goal):
            path = {}
            while current in came_from:
                path[str(current)] = str(came_from[current])
                current = came_from[current]
            return path

        x, y = current

        for dx, dy in [(1,0), (-1,0), (0,1), (0,-1)]:
            neighbor = (x + dx, y + dy)

            if 0 <= neighbor[0] < rows and 0 <= neighbor[1] < cols:
                cost = grid[neighbor[0]][neighbor[1]]
                temp_g = g_score[current] + cost

                if neighbor not in g_score or temp_g < g_score[neighbor]:
                    g_score[neighbor] = temp_g
                    f_score = temp_g + heuristic(neighbor, goal)
                    heapq.heappush(open_set, (f_score, neighbor))
                    came_from[neighbor] = current

    return {}


@app.post("/route")
def get_route(data: dict):
    grid = data["grid"]
    start = tuple(data["start"])
    goal = tuple(data["goal"])

    path = astar(grid, start, goal)

    return {
        "path": path
    }


# =========================
# 🔹 ROOT CHECK
# =========================

@app.get("/")
def home():
    return {"message": "Rockfall AI Backend Running 🚀"}