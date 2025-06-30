/**
 * Upload Gambar / Gif Menjadi Publik
 */

export default class ImageUpload {

  /**
   * Gak kepake ( Rusak jir 😂 )
   */
  static async fastUrl(file: File): Promise<{ link: string }> {

    const formData = new FormData();
    formData.append("file", file, file.name);

    const response = await fetch("https://api.fasturl.link/downup/uploader-v1", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.status != 200) {
      throw new Error("Failed to upload image.");
    }

    return { link: data.result };
  }

  /**
   * Free hosting image
   */
  static async freeHosting(file: File): Promise<{ link: string }> {
    const formData = new FormData();
    formData.append("source", file, file.name);
    formData.append("type", "file");
    formData.append("action", "upload");
    formData.append("timestamp", Date.now().toString());
    formData.append("auth_token", "1f61706c3b50bf520dcf8f2aa336385bc893a4fe");

    const response = await fetch("https://freeimage.host/json", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.status_code != 200) {
      throw new Error("Failed to upload image.");
    }

    return { link: data.image.display_url };
  }

}
