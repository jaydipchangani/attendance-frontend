import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../app/components/Navbar";

// mock the useAuth hook
jest.mock("../app/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "../app/contexts/AuthContext";

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title correctly", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, logout: jest.fn() });

    render(<Navbar />);
    expect(screen.getByText("Attendance System")).toBeInTheDocument();
  });

 it("shows user info when logged in", () => {
  (useAuth as jest.Mock).mockReturnValue({
    user: { name: "jaydip", role: "admin" },
    logout: jest.fn(),
  });

  render(<Navbar />);

  expect(screen.getByText(/jaydip \(admin\)/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
});


  it("calls logout when logout button is clicked", () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: "jaydip", role: "admin" },
      logout: mockLogout,
    });

    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
