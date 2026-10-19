import 'package:flutter/material.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.smart_toy_rounded, size: 96, color: Color(0xFF6C8CFF)),
            const SizedBox(height: 20),
            Text(
              'NovaAI',
              style: Theme.of(context).textTheme.headlineLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 8),
            const Text('Your AI companion for work, creativity, and conversation.'),
          ],
        ),
      ),
    );
  }
}
