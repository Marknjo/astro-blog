const navLinks: NodeListOf<HTMLAnchorElement> =
  document.querySelectorAll("[data-navLink]")

navLinks.forEach((link) => {
  if (link.getAttribute("href") === window.location.pathname) {
    link.setAttribute("aria-current", "page")
  }
})

const themeToggles = document.querySelector("[data-theme-toggle]")

const getTheme = () => localStorage.getItem("theme") || "light"

const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")

const setTheme = (theme) =>
  document.documentElement.setAttribute("data-theme", theme)

function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme
  }

  if (systemSettingDark.matches) {
    return "dark"
  }

  return "light"
}

const localStorageTheme = localStorage.getItem("theme")

function setDefaults() {
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")

  const localStorageTheme = getTheme()
  const themeStatus = calculateSettingAsThemeString({
    localStorageTheme,
    systemSettingDark,
  })

  const buttonEl = document.querySelector("[data-theme-toggle]")
  const lightElIcon = buttonEl?.querySelector("[data-icon-light]")
  const darkElIcon = buttonEl?.querySelector("[data-icon-dark]")

  // show light mode icon
  if (themeStatus && themeStatus === "dark") {
    darkElIcon!.classList.add("icon-theme--hidden")
    lightElIcon!.classList.remove("icon-theme--hidden")
  }

  // show dark mode icon
  if (themeStatus && themeStatus === "light") {
    lightElIcon!.classList.add("icon-theme--hidden")
    darkElIcon!.classList.remove("icon-theme--hidden")
  }

  setTheme(themeStatus)
}

window.addEventListener("DOMContentLoaded", setDefaults)

document.addEventListener("astro:after-swap", setDefaults)

themeToggles!.addEventListener("click", (event) => {
  const themeStatus = getTheme()
  const nextTheme = themeStatus === "light" ? "dark" : "light"

  const toLightMode = nextTheme === "light"
  const toDarkMode = nextTheme === "dark"

  const targetEl = (event.target as HTMLElement)?.closest("svg")

  if (targetEl) {
    const buttonEl = targetEl.parentElement!

    // show dark mode
    if (toDarkMode) {
      targetEl.classList.add("icon-theme--hidden")
      buttonEl
        .querySelector("[data-icon-light]")!
        .classList.remove("icon-theme--hidden")
    }

    // show light mode
    if (toLightMode) {
      targetEl.classList.add("icon-theme--hidden")
      buttonEl
        .querySelector("[data-icon-dark]")!
        .classList.remove("icon-theme--hidden")
    }
  }

  localStorage.setItem("theme", nextTheme)

  setTheme(nextTheme)
})
