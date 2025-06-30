/**
 * Controller Untuk Route Yang Tidak Perlu Pakai Middleware Auth ( X-Token )
 */

export default class PublicController {

  // Badge Controller
  static getAllBadges() {
    const badges = [
      {
        id: "karbit",
        name: "Karbit",
        icon: "Zap",
        iconColor: "text-cyan-500",
        textColor: "text-cyan-200"
      },
      {
        id: "crypto",
        name: "Crypto",
        icon: "Bitcoin",
        iconColor: "text-yellow-500",
        textColor: "text-yellow-200"
      },
      {
        id: "nolep",
        name: "Nolep",
        icon: "Gamepad2",
        iconColor: "text-red-500",
        textColor: "text-red-200"
      },
      {
        id: "contributor",
        name: "Contibutor",
        icon: "Handshake",
        iconColor: "text-green-500",
        textColor: "text-green-200"
      },
    ]

    return badges;
  }

}