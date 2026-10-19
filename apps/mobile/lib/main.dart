import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:novaai_mobile/core/app_theme.dart';
import 'package:novaai_mobile/screens/splash/splash_screen.dart';

void main() {
  runApp(const ProviderScope(child: NovaAIApp()));
}

class NovaAIApp extends StatelessWidget {
  const NovaAIApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NovaAI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      home: const SplashScreen(),
    );
  }
}
