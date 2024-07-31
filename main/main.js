import { app, BrowserWindow, Menu } from "electron";
import serve from "electron-serve";
import { join, dirname} from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appServe = app.isPackaged ? serve({
  directory: join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js")
    }
  });
  win.maximize()

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://gyro");
    });
  } else {
    win.loadURL("http://localhost:3000/gyro");
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
}

app.on("ready", () => {
    Menu.setApplicationMenu(null)
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});