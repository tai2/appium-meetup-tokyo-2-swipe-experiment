//
//  ContentView.swift
//  ScrollTest
//
//  Created by Taiju Muto on 2025/05/27.
//

import SwiftUI

struct ContentView: View {
    @State private var scrollOffset: CGFloat = 0
    @State private var initialOffset: CGFloat = 0
    
    var body: some View {
        GeometryReader { geometry in
            ZStack(alignment: .topTrailing) {
                ScrollView(.vertical, showsIndicators: false) {
                LazyVStack(spacing: 0) {
                    ForEach(Array(stride(from: 0, to: 5000, by: 10)), id: \.self) { pixelValue in
                        HStack(spacing: 4) {
                            Rectangle()
                                .fill(pixelValue % 100 == 0 ? Color.red : (pixelValue % 50 == 0 ? Color.blue : Color.gray))
                                .frame(width: pixelValue % 100 == 0 ? 60 : (pixelValue % 50 == 0 ? 40 : 20), height: 2)
                            
                            if pixelValue % 100 == 0 {
                                Text("\(pixelValue)px")
                                    .font(.caption2)
                                    .foregroundColor(.red)
                            } else if pixelValue % 50 == 0 {
                                Text("\(pixelValue)px")
                                    .font(.caption2)
                                    .foregroundColor(.blue)
                            }
                            
                            Spacer()
                        }
                        .frame(height: 10)
                    }
                }
                .padding(.bottom, geometry.size.height / 2)
                .background(
                    GeometryReader { scrollGeometry in
                        Color.clear
                            .onAppear {
                                initialOffset = scrollGeometry.frame(in: .global).minY
                                scrollOffset = 0
                            }
                            .onChange(of: scrollGeometry.frame(in: .global).minY) { _, newValue in
                                scrollOffset = initialOffset - newValue
                            }
                    }
                )
                }
                
                Text("Scroll: \(Int(scrollOffset))px")
                    .font(.caption)
                    .padding(8)
                    .background(Color.black.opacity(0.7))
                    .foregroundColor(.white)
                    .cornerRadius(4)
                    .padding(.top, 50)
                    .padding(.trailing, 16)
            }
        }
    }
}

#Preview {
    ContentView()
}
