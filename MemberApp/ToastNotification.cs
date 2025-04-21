
using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Threading;

namespace MemberApp
{
    public class ToastNotification
    {
        private readonly string _message;
        private Window _window;
        
        public ToastNotification(string message)
        {
            _message = message;
        }
        
        public void Show()
        {
            Application.Current.Dispatcher.Invoke(() =>
            {
                _window = new Window
                {
                    WindowStyle = WindowStyle.None,
                    ResizeMode = ResizeMode.NoResize,
                    Topmost = true,
                    ShowInTaskbar = false,
                    SizeToContent = SizeToContent.WidthAndHeight,
                    Background = Brushes.Transparent,
                    AllowsTransparency = true
                };
                
                Border container = new Border
                {
                    Background = new SolidColorBrush(Color.FromRgb(0, 166, 81)),
                    CornerRadius = new CornerRadius(5),
                    Padding = new Thickness(20, 15, 20, 15),
                    Margin = new Thickness(20),
                    Effect = new System.Windows.Media.Effects.DropShadowEffect
                    {
                        Color = Colors.Black,
                        Opacity = 0.2,
                        BlurRadius = 10
                    }
                };
                
                TextBlock textBlock = new TextBlock
                {
                    Text = _message,
                    Foreground = Brushes.White,
                    FontWeight = FontWeights.SemiBold,
                    FontSize = 14,
                    TextWrapping = TextWrapping.Wrap
                };
                
                container.Child = textBlock;
                _window.Content = container;
                
                // Position the toast in the bottom right corner
                var mainWindow = Application.Current.MainWindow;
                _window.Left = mainWindow.Left + mainWindow.Width - _window.Width - 20;
                _window.Top = mainWindow.Top + mainWindow.Height - _window.Height - 20;
                
                _window.Show();
                
                // Create fade-in animation
                DoubleAnimation fadeIn = new DoubleAnimation
                {
                    From = 0,
                    To = 1,
                    Duration = TimeSpan.FromMilliseconds(300)
                };
                
                _window.BeginAnimation(UIElement.OpacityProperty, fadeIn);
                
                // Schedule automatic close after 3 seconds
                DispatcherTimer timer = new DispatcherTimer
                {
                    Interval = TimeSpan.FromSeconds(3)
                };
                
                timer.Tick += (sender, args) =>
                {
                    timer.Stop();
                    
                    // Create fade-out animation
                    DoubleAnimation fadeOut = new DoubleAnimation
                    {
                        From = 1,
                        To = 0,
                        Duration = TimeSpan.FromMilliseconds(300)
                    };
                    
                    fadeOut.Completed += (s, e) => _window.Close();
                    _window.BeginAnimation(UIElement.OpacityProperty, fadeOut);
                };
                
                timer.Start();
            });
        }
    }
}
