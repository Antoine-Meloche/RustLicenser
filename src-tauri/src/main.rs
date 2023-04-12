#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::dialog;
use tauri::api::dialog::FileDialogBuilder;

#[tauri::command]
fn open_folder() -> String {
    let _folder_chooser: FileDialogBuilder = dialog::FileDialogBuilder::new();

    println!("Run!");

    return String::from("test");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
