import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from 'cors'
const app = express();
const PORT = 3000;
const DATA_FILE = "profiles.json";

app.use(bodyParser.json());
app.use(cors())

// Helper function to read profiles from file
const readProfiles = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Helper function to write profiles to file
const writeProfiles = (profiles) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(profiles, null, 2));
};

// CREATE a new profile
app.post("/profiles", (req, res) => {
  const profiles = readProfiles();
  const newId = profiles.length + 1;
  const newProfile = {
    id: newId,
    avatar: `https://robohash.org/${newId}.png?size=200x200`,
    ...req.body,
  };
  profiles.push(newProfile);
  writeProfiles(profiles);
  res.status(201).json(newProfile);
});

// READ all profiles
app.get("/profiles", (req, res) => {
  const profiles = readProfiles();
  res.json(profiles);
});

// READ a profile by id
app.get("/profiles/:id", (req, res) => {
  const profiles = readProfiles();
  const profile = profiles.find((p) => p.id === parseInt(req.params.id, 10));
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).send("Profile not found");
  }
});

// UPDATE a profile by id
app.put("/profiles/:id", (req, res) => {
  const profiles = readProfiles();
  const profileIndex = profiles.findIndex(
    (p) => p.id === parseInt(req.params.id, 10)
  );
  if (profileIndex !== -1) {
    profiles[profileIndex] = { id: profiles[profileIndex].id, ...req.body };
    writeProfiles(profiles);
    res.json(profiles[profileIndex]);
  } else {
    res.status(404).send("Profile not found");
  }
});

// DELETE a profile by id
app.delete("/profiles/:id", (req, res) => {
  const profiles = readProfiles();
  const newProfiles = profiles.filter(
    (p) => p.id !== parseInt(req.params.id, 10)
  );
  if (newProfiles.length !== profiles.length) {
    writeProfiles(newProfiles);
    res.status(204).send();
  } else {
    res.status(404).send("Profile not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
