/**
 * Upload Gambar / Gif Menjadi Publik
 */

import { Pomf, Catbox } from "@zanixongroup/uploader";

export default class ImageUpload {

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

    const data = (await response.json() as any);
    if (data.status_code != 200) {
      throw new Error("Failed to upload image.");
    }

    return { link: data.image.display_url };
  }

  /**
   * ZanixonGroup Uploader ( Pomf )
   * Thank to zanixonGroup
   */
  static async zanixonGroup(file: File): Promise<{ link: string }> {
    try {
      const bufferImage = await file.arrayBuffer();
      const data = await Pomf(Buffer.from(bufferImage));

      return { link: data };
    } catch (error) {
      throw new Error("Failed to upload image.");
    }
  }

  /**
   * ZanixonGroup Uploader ( Catbox )
   * Thank to zanixonGroup
   */
  static async zanixonGroupMirror(file: File): Promise<{ link: string }> {
    try {
      const bufferImage = await file.arrayBuffer();
      const data = await Catbox(Buffer.from(bufferImage));

      return { link: data };
    } catch (error) {
      console.log(error)
      throw new Error("Failed to upload image.");
    }
  }

}
